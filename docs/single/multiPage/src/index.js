const useState = React.useState;

function Main() {
    const [tabs, setTabs] = useState([
        {
            url: '',
            urlVisit: '',
            flex: 3,
            iframeKey: 0
        },
        {
            url: '',
            urlVisit: '',
            flex: 3,
            iframeKey: 0
        }
    ]);

    function changeUrl(index, url) {
        let tabsNew = tabs.slice();
        tabsNew[index].url = url;
        setTabs(tabsNew);
    }
    function visitOrRefresh(index) {
        let tabsNew = tabs.slice();
        tabsNew[index].urlVisit = tabsNew[index].url;
        tabsNew[index].iframeKey++;
        setTabs(tabsNew);
    }
    function clear(index) {
        let tabsNew = tabs.slice();
        tabsNew[index].url = '';
        setTabs(tabsNew);
    }
    function close(index) {
        let tabsNew = tabs.slice();
        tabsNew.splice(index, 1);
        setTabs(tabsNew);
    }
    function add() {
        let tabsNew = tabs.slice();
        tabsNew.push({
            url: '',
            urlVisit: '',
            flex: 3,
            iframeKey: 0
        });
        setTabs(tabsNew);
    }
    function changeFlex(index) {
        let tabsNew = tabs.slice();
        tabsNew[index].flex += 1;
        setTabs(tabsNew);
    }
    return (
        <div>
            <div className={'tabs'}>
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        index={index}
                        tab={tab}
                        onChange={(url) => changeUrl(index, url)}
                        onVisit={() => visitOrRefresh(index)}
                        onRefresh={() => visitOrRefresh(index)}
                        onClear={() => clear(index)}
                        onClose={() => close(index)}
                        onChangeFlex={() => changeFlex(index)}
                    />
                ))}
            </div>
            <div className={'add'} onClick={() => add()}>
                <div className={'gg-add'}></div>
            </div>
        </div>
    );
}

function Tab(props) {
    return (
        <div className={'tab'} style={{ flex: props.tab.flex }}>
            <div className={'navigator'}>
                <div className={'icons'} onClick={() => props.onChangeFlex()}>
                    <div className={'gg-arrows-shrink-h'}></div>
                </div>
                <div className={'icons'} onClick={() => props.onRefresh()}>
                    <div className={'gg-redo'}></div>
                </div>
                <input
                    className={'url'}
                    value={props.tab.url}
                    onChange={(e) => props.onChange(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            props.onVisit();
                        }
                    }}
                />
                <div className={'icons'} onClick={() => props.onClear()}>
                    <div className={'gg-backspace'}></div>
                </div>
                <div className={'icons'} onClick={() => props.onClose()}>
                    <div className={'gg-close'}></div>
                </div>
            </div>
            <div className={'page'}>
                <iframe key={props.tab.iframeKey} src={props.tab.urlVisit}></iframe>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.querySelector('#app')).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
