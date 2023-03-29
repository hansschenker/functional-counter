import h from "hyperscript"
import hh from "hyperscript-helpers"

const { div, button } = hh(h)



type Model = {
  count: number
}


interface SubtractEvent { kind:'subtract', by:number }
interface AddEvent { kind:'add', by:number }


type CountEvent = SubtractEvent | AddEvent

const initialModel:Model = {
  count : 0
}
type Dispatch = (msg: string) => void

type View = (dispatch:Dispatch, model:Model) => HTMLDivElement
function view(dispatch:Dispatch, model:Model) {
  return div([
    div({className:"mv2"}, `Count: ${model.count}`),
    button({className:"pv1 ph2 mr2",
            onclick: () => dispatch("plus")},
            "+"),
    button({className:"pv1 ph2",
            onclick: () => dispatch("minus")},
            "-"),
  ])
}

type Update = (model:Model, evt:string) => Model

function update(model:Model, evt:string): Model  {
  switch (evt) {
    case 'minus': return {...model, count: model.count -1};
    case 'plus':  return {...model, count: model.count + 1};
    default: return model;
  }
}

// app function connects all the pieces together
function app(initialModel:Model, update:Update, view:View, node:HTMLDivElement) {
  
  // initial render
  let model = initialModel
  let currentView = view(dispatch,model)
  node.appendChild(currentView)
  // subsequent render based on user action ('plus' or 'minus')
  function dispatch(msg: string) {
    model = update(model,msg)
    const updatedView = view(dispatch,model)
    // show the updated view with the updated state
    node.replaceChild(updatedView,currentView)
    currentView = updatedView
  }

}
// mount app
const rootNode = document.getElementById("app") as HTMLDivElement
app(initialModel, update, view, rootNode)
// rootNode!.appendChild(view(update(initialModel,"plus")));
