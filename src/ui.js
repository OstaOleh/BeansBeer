class Ui {

    drawItems(obj) {
        const parent = document.querySelector('.items-box')
        
        parent.innerHTML = ''
        let html = '';
        obj.forEach(item => {
            html += `
                <div class="item" data-item="${item.id}">
                <div class="hidden">
                    <div class="btn add-to-card"><i class="material-icons">favorite</i>
                    </div>
                </div>
                    <div class="item-left">
                        <img src="${item.img_url}" data-img="${item.img_url}"alt="${item.name}">
                    </div>
                    <div class="item-right">
                        <h3 class="item-name" data-name="${item.name}">${item.name}</h3>
                        <h4 class="item-tag" data-tag="${item.tag}">${item.tag}</h4>
                        <p class="item-descr" data-descr="${item.descr}">${item.descr}</p>
                        <div class="item-abv" data-abv="${item.abv}"> abv: ${item.abv}</div>
                        
                    </div>
                </div>
                `
        });

        parent.innerHTML = html;
    };

    getInp(that) {
        const inp = that.previousElementSibling;
        if (this.checkInp(inp)) {
            return inp.value;
        }
    };

    checkInp(inp) {
        if (inp.value === '') {
            this.createMsg('Pleace Fill Input', 'invalid-feedback')
        } else {
            this.createMsg('Search Is Good', 'valid-feedback')
            return true
        }
    };

    createMsg(msg, status) {
        const feedback = document.querySelector('.feedback');
        feedback.innerHTML = msg
        feedback.className = `feedback ${status}`
        feedback.style.display = 'block'
        setTimeout(() => {
            feedback.style.display = 'none'
        }, 2000);
    };

    getItem(trg) {
        const data = {}

        const item = trg.parentElement.parentElement.parentElement

        data.img = item.children[1].firstElementChild.dataset.img
        data.name = item.children[2].firstElementChild.dataset.name
        data.tag = item.children[2].children[1].dataset.tag
        data.descr = item.children[2].children[2].dataset.descr
        data.abv = item.children[2].children[3].dataset.abv
        data.id = item.dataset.item

        return data
    };

    createFavorList(favor) {

        const popupList = document.querySelector('.favor-popup');
        const popupListParent = popupList.parentElement;
        let html = '';

        popupListParent.style.display = 'block'
        popupListParent.previousElementSibling.classList.add('blur')

        if (favor.length) {
            favor.forEach((item, i) => {
                if (item.id === undefined) {
                    html = this.clearEmtyFavor(html, popupList, popupListParent);
                    favor.splice(i, 1);
                } 
                else {
                    html += `
                    <div class="item" data-item="${item.id}">
                        <div class="hidden">
                            <div class="btn delete-from-card"><i class="material-icons">delete</i>
                            </div>
                        </div>
                            <div class="item-left">
                                <img src="${item.img}" data-img="${item.img}"alt="${item.name}">
                            </div>
                            <div class="item-right">
                                <h3 class="item-name" data-name="${item.name}">${item.name}</h3>
                                <h4 class="item-tag" data-tag="${item.tag}">${item.tag}</h4>
                                <p class="item-descr" data-descr="${item.descr}">${item.descr}</p>
                                <div class="item-abv" data-abv="${item.abv}"> abv: ${item.abv}</div>
                                
                            </div>
                        </div>
                    `
                }
            })
        } else {
            html = this.clearEmtyFavor(html, popupList, popupListParent);
        }

        popupList.innerHTML = html;
    };

    clearEmtyFavor(html, popupList, popupListParent) {
        html = '<h2 class="text-center">Favorite list is empty</h2>'
        setTimeout(() => {
            popupList.firstElementChild.style.display = 'none';
            popupListParent.style.display = 'none';
            popupListParent.previousElementSibling.classList.remove('blur')
        }, 2000);
        return html
    };

    closeFavor(popup) {
        const popupList = document.querySelector('.favor-popup');
        const popupListParent = popupList.parentElement;
        popupListParent.style.display = 'none';
        popupListParent.previousElementSibling.classList.remove('blur')
    };

    getFavorItem(trg) {
        let name;
        if (trg.classList.contains('material-icons')) {
            name = trg.parentElement.parentElement.parentElement.children[2].firstElementChild.dataset.name

        }
        return name
    }
};

export default Ui