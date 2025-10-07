(() => {
  async function addToCart(productId) {
    try {
      const res = await fetch(`/api/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: [{ product: productId, quantity: 1 }]
        })
      });

      if (!res.ok) {
        throw new Error('Error al crear carrito');
      }

      showNotification('Producto agregado al carrito', 'success');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      showNotification('Error al agregar producto', 'error');
    }
  }

  function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'danger'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'info' ? 'info' : 'exclamation-triangle'}"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
  }

  // Exponer funciones necesarias para atributos onclick en la vista
  window.addToCart = addToCart;
})();