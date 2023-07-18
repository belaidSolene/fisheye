// The App class is responsible for managing focus styles during navigation.
// It applies a specific focus style to elements when keyboard navigation is active,
// and removes the style when mouse navigation is used.
class App {
    constructor() {
        this._addStyleFocus();
    }
    
    _addStyleFocus() {
        document.addEventListener('keydown', () => {
            document.body.classList.add('key-navigation');
        })

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('key-navigation');
        })
    }
}
