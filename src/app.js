import  Model  from "./model";
import  Ui  from "./ui";
import  Ls  from "./ls";
import  Contr   from "./contr";



const ui = new Ui();
const ls = new Ls();
const model = new Model(ui);
const contr = new Contr(ui, model, ls);

contr.init();