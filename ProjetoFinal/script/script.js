// ==========================================
// 1. BASE DE DADOS E PERSISTÊNCIA (localStorage)
// ==========================================
const defaultServices = [
  {
    id: 1,
    name: 'Corte Feminino',
    price: 55.00,
    time: '45 min',
    desc: 'Corte personalizado de acordo com o formato do rosto e o estilo desejado. Inclui acabamento e finalização simples.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=200',
    active: true
  },
  {
    id: 2,
    name: 'Escova Simples',
    price: 50.00,
    time: '50 min',
    desc: 'Lavagem, secagem e escova para alinhamento dos fios. Ideal para um visual mais liso e bem acabado.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=200',
    active: true
  },
  {
    id: 3,
    name: 'Hidratação Capilar',
    price: 65.00,
    time: '50 min',
    desc: 'Tratamento para recuperar brilho, maciez e saúde dos fios. Indicado para cabelos ressecados ou danificados.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=200',
    active: true
  }
];

let services = JSON.parse(localStorage.getItem('studio_services')) || defaultServices;

function saveServicesToStorage() {
  localStorage.setItem('studio_services', JSON.stringify(services));
}

let currentImage = '';

// ==========================================
// 2. FUNÇÃO DE RENDERIZAÇÃO, FILTRO E ORDENAÇÃO
// ==========================================
function renderServices() {
  const servicesContainer = document.getElementById('servicesContainer');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (!servicesContainer) return;

  let filteredServices = [...services];

  // 1. Filtrar por busca (Nome ou Descrição)
  if (searchInput && searchInput.value.trim() !== '') {
    const searchTerm = searchInput.value.toLowerCase();
    filteredServices = filteredServices.filter(service => 
      service.name.toLowerCase().includes(searchTerm) || 
      service.desc.toLowerCase().includes(searchTerm)
    );
  }

  // 2. Ordenar Lista
  if (sortSelect) {
    const sortBy = sortSelect.value;
    filteredServices.sort((a, b) => {
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'menor-preco') {
        return a.price - b.price;
      } else if (sortBy === 'maior-preco') {
        return b.price - a.price;
      } else if (sortBy === 'tempo') {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeA - timeB;
      } else {
        return b.id - a.id;
      }
    });
  }

  if (filteredServices.length === 0) {
    servicesContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px; grid-column: 1 / -1;">Nenhum serviço encontrado.</p>`;
    return;
  }
  
  servicesContainer.innerHTML = filteredServices.map(service => {
    const isActive = service.active !== false;

    return `
      <div class="service-card" data-id="${service.id}" style="${!isActive ? 'opacity: 0.6; background: #fdf2f2;' : ''}">
        <img src="${service.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200'}" alt="${service.name}" class="service-img">
        <div class="service-details">
          <div class="service-header">
            <h4 class="service-title">${service.name} ${!isActive ? '(Inativo)' : ''}</h4>
            <div>
              <div class="service-price">R$ ${service.price.toFixed(2).replace('.', ',')}</div>
              <span class="service-time"><i class="ri-time-line"></i> ${service.time}</span>
            </div>
          </div>
          <p class="service-desc">${service.desc}</p>
          <div class="service-actions">
            <button class="btn-edit" onclick="editService(${service.id})">
              <i class="ri-pencil-line"></i> Editar
            </button>
            
            <button class="btn-delete" onclick="toggleServiceStatus(${service.id})" style="color: ${isActive ? '#dc3545' : '#198754'};">
              <i class="${isActive ? 'ri-eye-off-line' : 'ri-eye-line'}"></i> ${isActive ? 'Desativar' : 'Ativar'}
            </button>

            ${!isActive ? `
              <button class="btn-delete" onclick="hardDeleteService(${service.id})" style="color: #800A28; border-color: #800A28;">
                <i class="ri-delete-bin-line"></i> Excluir
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 3. FUNÇÕES GLOBAIS DE EDIÇÃO, STATUS E EXCLUSÃO
// ==========================================
window.editService = function(id) {
  const service = services.find(s => s.id === id);
  if (!service) return;

  const serviceModal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const imagePreview = document.getElementById('imagePreview');

  document.getElementById('serviceId').value = service.id;
  document.getElementById('serviceName').value = service.name;
  document.getElementById('serviceDesc').value = service.desc;
  document.getElementById('servicePrice').value = service.price;
  document.getElementById('serviceTime').value = parseInt(service.time) || '';

  currentImage = service.image;
  if (imagePreview) {
    imagePreview.innerHTML = `<img src="${service.image}" alt="${service.name}">`;
  }

  if (modalTitle) modalTitle.textContent = 'Editar serviço';
  if (serviceModal) serviceModal.classList.add('active');
};

window.toggleServiceStatus = function(id) {
  const service = services.find(s => s.id === id);
  if (service) {
    service.active = service.active === false ? true : false;
    saveServicesToStorage();
    renderServices();
  }
};

window.hardDeleteService = function(id) {
  if (confirm('Tem certeza que deseja excluir permanentemente este serviço? Esta ação não pode ser desfeita.')) {
    services = services.filter(s => s.id !== id);
    saveServicesToStorage();
    renderServices();
  }
};

// ==========================================
// 4. INICIALIZAÇÃO SEGURA DOS EVENTOS (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const serviceModal = document.getElementById('serviceModal');
  const serviceForm = document.getElementById('serviceForm');
  const modalTitle = document.getElementById('modalTitle');
  const imageInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  function closeModal() {
    if (serviceModal) serviceModal.classList.remove('active');
  }

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      if (modalTitle) modalTitle.textContent = 'Adicionar serviço';
      if (serviceForm) serviceForm.reset();
      const serviceIdField = document.getElementById('serviceId');
      if (serviceIdField) serviceIdField.value = '';
      currentImage = '';
      if (imagePreview) imagePreview.innerHTML = '<i class="ri-image-add-line"></i>';
      if (serviceModal) serviceModal.classList.add('active');
    });
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Fechar modal clicando fora do card (overlay)
  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        closeModal();
      }
    });
  }

  if (imageInput) {
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          currentImage = evt.target.result;
          if (imagePreview) imagePreview.innerHTML = `<img src="${currentImage}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('serviceId').value;
      const name = document.getElementById('serviceName').value;
      const desc = document.getElementById('serviceDesc').value;
      const price = parseFloat(document.getElementById('servicePrice').value);
      const timeVal = document.getElementById('serviceTime').value;
      const time = timeVal ? `${timeVal} min` : '30 min';

      if (id) {
        const index = services.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          services[index] = {
            ...services[index],
            name,
            desc,
            price,
            time,
            image: currentImage || services[index].image
          };
        }
      } else {
        const newService = {
          id: Date.now(),
          name,
          desc,
          price,
          time,
          image: currentImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200',
          active: true
        };
        services.unshift(newService);
      }

      saveServicesToStorage();
      renderServices();
      closeModal();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderServices);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', renderServices);
  }

  renderServices();
});