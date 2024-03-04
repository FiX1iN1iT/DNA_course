export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const showToastBtn = document.getElementById('showToastBtn');
        showToastBtn.addEventListener('click', () => {
            this.showToast();
        });
    }

    showToast() {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '<div class="toast-body">Шутка</div>';
        document.body.appendChild(toast);

        const bootstrapToast = new bootstrap.Toast(toast);

        bootstrapToast.show();
    }
}
