document.addEventListener('DOMContentLoaded', function () {
  let currentUser = null;
  let transactions = [];
  let categoryChart = null;
  let trendsChart = null;

  const expenseCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];
  const incomeCategories = [
    'Salary', 'Freelance', 'Business', 'Investments', 'Gifts', 'Other'
  ];

  // Elements
  const userNameElem = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  const modal = document.getElementById('transactionModal');
  const addTransactionBtn = document.getElementById('addTransactionBtn');
  const closeModal = document.getElementById('closeModal');
  const cancelTransaction = document.getElementById('cancelTransaction');
  const transactionForm = document.getElementById('transactionForm');
  const transactionType = document.getElementById('transactionType');
  const transactionCategory = document.getElementById('transactionCategory');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const transactionsList = document.getElementById('transactionsList');

  // 🔹 Authentication
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      userNameElem.textContent = user.displayName || 'User';
      await loadUserData();
    } else {
      window.location.href = 'auth.html';
    }
  });

  // 🔹 Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      await auth.signOut();
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    }
  });

  // 🔹 Modal open
  addTransactionBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
    transactionForm.reset();
    populateCategories(transactionType.value);
  });

  // 🔹 Modal close
  [closeModal, cancelTransaction].forEach(btn =>
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      transactionForm.reset();
    })
  );

  // 🔹 Populate categories
  function populateCategories(type) {
    const categories = type === 'income' ? incomeCategories : expenseCategories;
    transactionCategory.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      transactionCategory.appendChild(option);
    });
  }

  transactionType.addEventListener('change', e => populateCategories(e.target.value));
  populateCategories(transactionType.value);

  // 🔹 Add transaction
  transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('User not authenticated.');

    const type = transactionType.value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const category = transactionCategory.value;
    const description = document.getElementById('transactionDescription').value.trim();
    const date = document.getElementById('transactionDate').value;

    if (!type || !category || isNaN(amount) || amount <= 0 || !date) {
      return alert('Please fill out all required fields with valid values.');
    }

    const newTransaction = {
      type, amount, category, description, date,
      userId: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
      await db.collection('transactions').add(newTransaction);
      modal.classList.remove('active');
      transactionForm.reset();
      await loadUserData();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  });

  // 🔹 Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayTransactions(btn.getAttribute('data-filter'));
    });
  });

  // 🔹 Load data
  async function loadUserData() {
    if (!currentUser) return;
    try {
      const snapshot = await db.collection('transactions')
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get();

      transactions = snapshot.docs.map(doc => {
        const data = doc.data();
        let dateStr = data.date;
        if (data.date && typeof data.date.toDate === 'function') {
          dateStr = data.date.toDate().toISOString().slice(0, 10);
        }
        return { id: doc.id, ...data, date: dateStr };
      });

      updateStats();
      updateCharts();
      displayTransactions('all');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  // 🔹 Stats
  function updateStats() {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('netBalance').textContent = `$${netBalance.toFixed(2)}`;
    document.getElementById('savingsRate').textContent = `${savingsRate.toFixed(1)}%`;
  }

  // 🔹 Charts
  function updateCharts() {
    updateCategoryChart();
    updateTrendsChart();
  }

  function updateCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const expensesByCategory = {};
    transactions.filter(t => t.type === 'expense')
      .forEach(t => expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount);

    const labels = Object.keys(expensesByCategory);
    const data = Object.values(expensesByCategory);
    const colors = ['#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6', '#F97316', '#84CC16'];

    if (categoryChart) categoryChart.destroy();
    categoryChart = new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2, borderColor: '#fff' }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } } }
    });
  }

  function updateTrendsChart() {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    const monthlyData = {};
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = date.toISOString().slice(0, 7);
      monthlyData[key] = { income: 0, expenses: 0 };
    }

    transactions.forEach(t => {
      if (t.date) {
        const key = t.date.slice(0, 7);
        if (monthlyData[key]) {
          monthlyData[key][t.type === 'income' ? 'income' : 'expenses'] += t.amount;
        }
      }
    });

    const labels = Object.keys(monthlyData).map(key => new Date(key + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
    const incomeData = Object.values(monthlyData).map(d => d.income);
    const expenseData = Object.values(monthlyData).map(d => d.expenses);

    if (trendsChart) trendsChart.destroy();
    trendsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Income', data: incomeData, backgroundColor: '#10B981' },
          { label: 'Expenses', data: expenseData, backgroundColor: '#EF4444' }
        ]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  // 🔹 Display transactions
  function displayTransactions(filter) {
    let list = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);
    if (!list.length) {
      transactionsList.innerHTML = `<div style="text-align:center;padding:2rem;color:#64748b;">
        <i class="fas fa-inbox" style="font-size:3rem;opacity:.5;"></i><p>No transactions found</p></div>`;
      return;
    }
    transactionsList.innerHTML = list.map(t => `
      <div class="transaction-item">
        <div class="transaction-info">
          <div class="transaction-icon ${t.type}">
            <i class="fas fa-${t.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i>
          </div>
          <div class="transaction-details">
            <h4>${t.description || 'No description'}</h4>
            <p>${t.category}</p>
          </div>
        </div>
        <div class="transaction-amount">
          <div class="amount ${t.type}">${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}</div>
          <div class="date">${formatDate(t.date)}</div>
        </div>
      </div>
    `).join('');
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
});
