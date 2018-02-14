class Contr {
    constructor(ui, model, ls) {
        this.ui = ui;
        this.model = model;
        this.ls = ls;
    }


    init() {
        const posts = this.model.getPosts();
        // console.log(posts)
        // this.ui.drawItems(posts)
        document.querySelector('#more').addEventListener('click',()=> this.model.addItems())

        document.querySelector('#btn-search').addEventListener('click', (e)=> {
            e.preventDefault();

            const inp = this.ui.getInp(document.querySelector('#btn-search'))
            this.model.searchItem(inp)
        });

        document.querySelector('.items-box').addEventListener('click', (e) => {
            if (e.target.classList.contains('material-icons')) {
                const item = this.ui.getItem(e.target)
                if (this.model.addFavoriteItem(item)) {
                    this.ls.addToStore(item);
                }
                
            }
        });

        document.querySelector('.btn-favor').addEventListener('click', ()=> {
            const favor = this.model.returnFavorites();
            this.ui.createFavorList(favor);
        });

        document.querySelector('.close-favor-btn').addEventListener('click', this.ui.closeFavor);

        document.querySelector('.favor-popup_wrap').addEventListener('click', (e)=> {
            const item = this.ui.getFavorItem(e.target);
            const newFavor = this.model.removeFromFavor(item);
            this.ls.resrtLs(item);
            this.ui.createFavorList(newFavor);
        });

        document.addEventListener('DOMContentLoaded', ()=> {
            this.model.addFavoriteItem(this.ls.checkLs())
        });
    }
} 

export default Contr