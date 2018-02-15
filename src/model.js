class Model {

    constructor() {
        this.url = 'https://api.punkapi.com/v2/'
        this.type = 'beers';
        this.param = '';
        this.page = 1;
        this.perPage = '&per_page=24'
    }
    state = {
        name: '',
        img_url: '',
        descr: '',
        abv: 0,
        boil_val: {
            val: 0,
            unit: ''
        },
        first_brewed: '',
        tag: '',
        id: 0
    }

    arr = [];
    favorite = [];

    getPosts() {
        this.arr = [];
        let url = ''
        if (this.param === '') {
            url = `${this.url}${this.type}${this.param}?page=${this.page}${this.perPage}`
        } else {
            url = `${this.url}${this.type}?beer_name=${this.param}&page=${this.page}${this.perPage}`
        }
        console.log(url)
        return fetch(url)
            .then(responce => responce.json())
            .then(data => {
                data.forEach(item => {
                    this.state = {
                        name: item.name,
                        img_url: item.image_url,
                        descr: item.description,
                        abv: item.abv,
                        boil_val: {
                            val: item.boil_volume.value,
                            unit: item.boil_volume.unit
                        },
                        first_brewed: item.first_brewed,
                        tag: item.tagline,
                        id: item.id

                    }
                    this.arr.push(this.state)
                });
                return this.arr


            })
            .catch(err => console.log(err))
    }

    addItems() {
        this.page++;
        this.getPosts()
    }

    searchItem(param) {
        this.param = param;
        this.getPosts()
    }

    addFavoriteItem(item) {
        if (item.length) {
            item.forEach(el => {
                this.favorite.push(el)
            })
        }else {
            if (!this.favorite.length) {
                this.favorite.push(item);
                return true
            } else {
                let state = true
                this.favorite.forEach(favor => {
                    if (favor.id == item.id) {
                        state = false
                    }
                })
                if (state) {
                    this.favorite.push(item);
                    state = false;
                    return true
                }
            }
        }
    };

    returnFavorites() {       
        return this.favorite
    };

    removeFromFavor(name) {
        this.favorite.forEach((item, i, arr) => {
            if (item.name === name) {
                arr.splice(i, 1)
            }
        })
        return this.favorite
    }
};

export default Model