import React from 'react'

const Title = ({
title1,
title2,
titleStyles,
title1Styles,
paraStyles,
para
})=> {
  return (
    <div className={`${titleStyles}`}>
      <h3 className={`${title1Styles} h3 capitalize`}>
        {title1}
        <span className='text-secondary font-light underline p-2'>{title2}</span>
      </h3>
      <p className={`${paraStyles} max-w-md`}>
        {para ? para : "Explore our collecion of stylish clothing and footwear made for confort, quality and everyday confidence."}
      </p>
    </div>
  )
}

export default Title