class App {
    _addStyleFocus() {
        document.addEventListener('keydown', () => {
            document.body.classList.add('key-navigation');
        })

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('key-navigation');
        })
    }
}
