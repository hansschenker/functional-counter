//import h from "hyperscript"
import hh from "hyperscript-helpers"
import { h, diff, patch, VNode} from "virtual-dom"
import createElement from "virtual-dom/create-element"

const { div, button } = hh(h)


// state
type Model = {
  count: number,
  by: number,
}
const initialModel:Model = {
  count : 0,
  by: 5,
}

// user events: event with data
interface MinusEvent { kind:'minus', by:number }
interface PlusEvent { kind:'plus', by:number }

// allow for discriminant union
type CountEvent = MinusEvent | PlusEvent
type Dispatch = (evt: CountEvent) => void


// view dispatch user events: plus or minus
type View = (dispatch:Dispatch, model:Model) => VNode
function view(dispatch:Dispatch, model:Model) {
  return div([
    div({className:"mv2"}, `Count: ${model.count}`),
    div({className:"mv2"}, `By: ${model.by}`),
    button({className:"pv1 ph2 mr2",
            onclick: () => dispatch({ kind:'plus', by:1 })},
            "+"),
    button({className:"pv1 ph2",
            onclick: () => dispatch({ kind:'minus', by:-1 })},
            "-"),
  ])
}
// update cycle
type Update = (model:Model, evt:CountEvent) => Model
function update(model:Model, evt:CountEvent): Model  {
  switch (evt.kind) {
    case "minus": return {...model, count: model.count - model.by};
    case 'plus':  return {...model, count: model.count + model.by};
    default: return model;
  }
}

// app function connects all the pieces together
function app(initialModel:Model, update:Update, view:View, node:HTMLElement) {
  
  // initial render
  let model = initialModel
  let currentView = view(dispatch,model)
  let rootNode = createElement(currentView)
  
  node.appendChild(rootNode)

  // subsequent renders based on user action ('plus' or 'minus')
  function dispatch(msg: CountEvent) {
    model = update(model,msg)
    const updatedView = view(dispatch,model) 
    const patches = diff(currentView,updatedView)
    rootNode = patch(rootNode, patches)

    // show the updated view with the updated state
    //node.replaceChild(updatedView,currentView)
    currentView = updatedView
  }

}
// mount app
const rootNode = document.getElementById("app") as HTMLDivElement
app(initialModel, update, view, rootNode)
// rootNode!.appendChild(view(update(initialModel,"plus")));
