export default function AboutFooter() {

    function FooterContent({text}) {
        return (
            <div className="aboutFooterLinks">
                <h2 className="sectionHead">{text.header}</h2>
                <h2>{text.link1}</h2>
                <h2>{text.link2}</h2>
                <h2>{text.link3}</h2>
            </div>
        );
    }
    return (
        <div className="aboutFooter">
            <h1>KomuniJOB</h1>
            <div className="aboutFooterContent">
                <FooterContent text={{header: "Company", link1: "About", link2: "Placeholder", link3: "Placeholder"}} />
                <FooterContent text={{header: "Contacts", link1: "Help/FAQ", link2: "Press", link3: "Affiliates"}} />
                <FooterContent text={{header: "More", link1: "Placeholder", link2: "Placeholder", link3: "Placeholder"}} />
            </div>
            <p>All rights reserved &copy;KomuniJOB</p>
        </div>
    );
}