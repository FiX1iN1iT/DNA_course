export class SelectComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("myselector")
            .addEventListener("change", listener)
    }

    getHTML() {
        return (
            `
            <select id="myselector" class="form-select" aria-label="Пример выбора по умолчанию">
                <option selected>Откройте это меню выбора</option>
                <option value="1">chat1</option>
                <option value="2">chat2</option>
                <option value="3">chat3</option>
            </select>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}