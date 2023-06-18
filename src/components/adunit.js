import React from "react";
import styled from "styled-components"

export const AdUnitType = {
    Grid: 0,
    InArticle: 1
};

export default function AdUnit({ type = AdUnitType.Grid, withShadow = false }) {
    const clientId = 'ca-pub-4889352773674825';
    let isLocalhost = true; // false on production

    //return null;

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
        return <AdWrapper><Ins className="adsbygoogle"
            style={style}
            {...dataTestProp}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={clientId}
            data-ad-slot="2581564797"></Ins></AdWrapper>;
    }

    return <Ins className="adsbygoogle"
        style={style}
        {...dataTestProp}
        data-ad-client={clientId}
        data-ad-slot="3654107349"
        data-ad-format="auto"
        data-full-width-responsive="true" />;
}

const AdWrapper = styled.div`
    margin: 1.5rem auto 2.5rem;

    &:has(ins.adsbygoogle[data-ad-status='unfilled']){
        height: 1px;
    }

    &:has(ins:empty){
        height: 1px;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        aspect-ratio: 1 / 1;
        margin: 1.2rem auto 0;
    }
`;

const Ins = styled.ins`
display: block;
width: 100%;
height: 100%;
background: white;
`;