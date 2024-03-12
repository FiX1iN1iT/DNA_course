import { ProductCardComponent } from "../../components/product-card/index.js";
import { SelectComponent } from "../../components/select/index.js";
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
        ajax.post(urls.getUserFriends(183794865), (data) => {
            this.renderData(data.response.items)
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    renderData(items) {
        items.forEach((item) => {
            let city = item.city
            let sex = item.sex
            if (city != null && sex != null) {
                if (city.title == "Moscow" && sex == 2) {
                    const productCard = new ProductCardComponent(this.pageRoot)
                    productCard.render(item, this.clickCard.bind(this))
                }
            }
        })
    }

    onChange() {
        let selector = document.getElementById("myselector");
        let newId = startId + Number(selector.value);

        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const mySelector = new SelectComponent(this.pageRoot)
        mySelector.render(this.onChange.bind(this))

        this.getData(newId)
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const mySelector = new SelectComponent(this.pageRoot)
        mySelector.render(this.onChange.bind(this))

        this.getData(defaultId)
    }
}