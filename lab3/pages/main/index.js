import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

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
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
        
    getData() {
        return [
            {
                id: 1,
                src: "https://www.advgazeta.ru/upload/iblock/d8b/kak_klientam_bankov_zashchititsya_ot_nezakonnykh_spisaniy_1.jpg",
                title: "Банк",
                text: "Банк заблокировал счет. Что делать?"
            },
            {
                id: 2,
                src: "https://finlit.uz/upload/iblock/5eb/Frame_33136_2_.jpg",
                title: "Кредит",
                text: "Кредит есть, а денег нет. Что делать?"
            },
            {
                id: 3,
                src: "https://static.mk.ru/upload/entities/2021/01/26/20/articles/detailPicture/ac/2c/17/51/0406f8bbc383de59f1965dcf6a7b5afd.jpg",
                title: "Страховка",
                text: "Как отказаться от ненужной страховки?"
            },
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
        
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {    
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}