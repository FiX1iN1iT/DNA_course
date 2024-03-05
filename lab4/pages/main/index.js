import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { defaultId, groupId, startId } from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap">
                    <select class="form-select" onchange="this.handleSelection(this)" aria-label="Пример выбора по умолчанию">
                        <option selected>Откройте это меню выбора</option>
                        <option value="1">chat1</option>
                        <option value="2">chat2</option>
                        <option value="3">chat3</option>
                    </select>
                <div/>
            `
        )
    }

    handleSelection(selectElement) {
        const chatNumber = Number(selectElement.value);
        const peerId = startId + chatNumber;

        this.getData(peerId);
    }

    // getData() {
    //     ajax.post(urls.getGroupMembers(groupId), (data) => {
    //         this.renderData(data.response.items)
    //     })
    // }

    getData(peerId) {
        ajax.post(urls.getConversationMembers(peerId), (data) => {
            this.renderData(data.response.items)
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const data = this.getData()

        const productPage = new ProductPage(this.parent)
        productPage.render(data[cardId - 1])
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData(defaultId)
    }
}