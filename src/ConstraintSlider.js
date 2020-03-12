import React from 'react'
import { Slider } from 'antd'
import { CarOutlined } from '@ant-design/icons' 

const ConstraintSlider = ( ({ value, text}) => {

    return(
        <section>
            <div>
                <CarOutlined />
                <Slider className="w-100" value={value} min={0} max={60} onChange={onchange}/>
            </div>
    <span className="text-center">{text}</span>
        </section>
    )
})

export default ConstraintSlider 