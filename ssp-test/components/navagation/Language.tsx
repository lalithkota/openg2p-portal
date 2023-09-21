import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function Language() {
    // const handleItemClick = (url) => {
    //     .push(url);
    //   };
    return (
        <div>
            <div className="language-dropdown language-box">
                <button className="dropdown-toggle button" type="button" id="language-dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Image
                        src="/img/flag_en.png" alt="English" className="flag"
                        width={500}
                        height={300}
                    />
                    <span>English</span>
                </button>

                <div className="dropdown-menu" aria-labelledby="language-dropdown-button">
                    <Link
                        className={`dropdown-item ${activeItem === 'en' ? 'active' : ''}`}
                        href="/website/lang/en?r=/selfservice"
                        data-url_code="en"
                        onClick={() => handleItemClick('en')}>
                        <Image src="/img/flag_en.png" alt="English" className="flag" width={500} height={300} />
                        <span>English</span>
                    </Link>

                    <Link
                        className={`dropdown-item ${activeItem === 'fr' ? 'active' : ''}`}
                        href="/website/lang/fr?r=/selfservice"
                        data-url_code="fr"
                        onClick={() => handleItemClick('fr')}>
                        <Image src="/img/FR.png" alt="Français" className="flag" width={500} height={300} />
                        <span>Français</span>
                    </Link>
                    
                    <Link
                        className={`dropdown-item ${activeItem === 'tl' ? 'active' : ''}`}
                        href="/website/lang/tl?r=/selfservice"
                        data-url_code="tl"
                        onClick={() => handleItemClick('tl')}>
                        <Image
                            src="/img/flag_ph.png" alt="Filipino" className="flag"width={500} height={300}/>
                        <span>Filipino</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Language