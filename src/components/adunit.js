import React from "react";
import styled from "styled-components"

export const AdUnitType = {
    Grid: 0,
    InArticle: 1
};

export default function AdUnit({ type = AdUnitType.Grid, withShadow = false }) {
    const clientId = 'ca-pub-4889352773674825';
    let isLocalhost = false; // false on production

    React.useEffect(_ => {
        let p = { google_ad_client: clientId };
        if (typeof window === 'object') {
            (window.adsbygoogle = window.adsbygoogle || []).push(p);
        }
    }, []);

    const dataTestProp = {};
    if (isLocalhost) {
        dataTestProp['data-ad-test'] = 'on';
    }

    const style = withShadow ? { boxShadow: '1px 1px 3px 0 rgba(0,0,0, 0.15)' } : undefined;

    if (type === AdUnitType.InArticle) {
        return <Ins className="adsbygoogle"
            style={style}
            {...dataTestProp}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={clientId}
            data-ad-slot="2581564797"></Ins>;
    }

    return <Ins className="adsbygoogle"
        style={style}
        {...dataTestProp}
        data-ad-client={clientId}
        data-ad-slot="3654107349"
        data-ad-format="auto"
        data-full-width-responsive="true"></Ins>;
}

const Ins = styled.ins`
display: block;
width: 100%;
height: 100%;
background: white;
`;