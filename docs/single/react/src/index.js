const useState = React.useState;

function Main() {
    return <div>test</div>;
}

ReactDOM.createRoot(document.querySelector('#app')).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
