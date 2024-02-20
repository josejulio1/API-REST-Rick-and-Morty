export class Item {
    constructor(...nodes) {
        this.article = document.createElement('article');

        this.article.classList.add('item');
        for (const node of nodes) {
            this.article.appendChild(node);
        }
    }

    getItem() {
        return this.article;
    }
}