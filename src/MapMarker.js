import React from 'react'
import { EnvironmentTwoTone } from '@ant-design/icons';

const MapMarker = ( (name) => {
    return(
        <div>
            <span className="brand-red">{name}</span>
            <EnvironmentTwoTone twoToneColor="fd0000"/>
        </div>
    )
})

export default MapMarker