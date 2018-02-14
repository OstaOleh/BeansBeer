class Ls {

    checkLs() {
        let ls;
        if (localStorage.getItem('beer') === null) {
            ls = [];
        } else {
            ls = JSON.parse(localStorage.getItem('beer'))
        }
        // console.log(ls)
        return ls;
    };

    addToStore(item) {
        const store = this.checkLs();
        store.push(item)
        localStorage.setItem('beer', JSON.stringify(store))
    };

    resrtLs(item) {
        const store = this.checkLs();
        store.forEach((st, i, arr) => {
            if (st.name === item ) {
                store.splice(i, 1)
            }
        });
        localStorage.setItem('beer', JSON.stringify(store))
    };
}

export default Ls