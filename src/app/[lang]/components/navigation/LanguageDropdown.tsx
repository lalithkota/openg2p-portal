"use client"
import { Fragment, useState ,useEffect} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function LanguageDropDown() {
  const pathName = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr' | 'tl'>(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      return storedLanguage && ['en', 'fr', 'tl'].includes(storedLanguage)
        ? (storedLanguage as 'en' | 'fr' | 'tl')
        : 'en';
    } else {
      return 'en';
    }
  });

  const handleLanguageChange = (locale: 'en' | 'fr' | 'tl') => {
    setSelectedLanguage(locale);
  };


  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && ['en', 'fr', 'tl'].includes(storedLanguage)) {
      setSelectedLanguage(storedLanguage as 'en' | 'fr' | 'tl');
    }
  }, []);

  const redirectedPathName = (locale: 'en' | 'fr' | 'tl') => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  const getFlagImage = (locale: 'en' | 'fr' | 'tl') => {
    const flagImages = {
      en: 'http://spar.openg2p.my/spar/img/flag_en.png',
      fr: 'http://spar.openg2p.my/spar/img/flag_fr.png',
      tl: 'http://spar.openg2p.my/spar/img/flag_tl.png',
    };

    return flagImages[locale];
  };
  return (
    <Menu as="div" className="relative inline-block text-left w-[120px]  print:hidden">
      <div>
        <Menu.Button className="flex  border border-gray-400  justify-between items-center w-full gap-x-2 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
        <img src={getFlagImage(selectedLanguage || 'en')} alt={selectedLanguage} className="w-4 h-4 mr-2" />
          <span>{selectedLanguage === 'en' ? 'English' : selectedLanguage === 'fr' ? 'Français' : 'Language'}</span>
          <ChevronDownIcon className="mr-1 h-5 w-10 text-gray-400 hide" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-gray-400  focus:outline-none">
          <div className="py-1 flex-col items-center">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={redirectedPathName('en')}
                  data-url_code="en"
                  onClick={() => handleLanguageChange('en')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img src="http://spar.openg2p.my/spar/img/flag_en.png" alt="English" />
                  <span>English</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={redirectedPathName('fr')}
                  data-url_code="fr"
                  onClick={() => handleLanguageChange('fr')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img src="http://spar.openg2p.my/spar/img/flag_fr.png" alt="Français" />
                  <span>Français</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={redirectedPathName('tl')}
                  data-url_code="tl"
                  onClick={() => handleLanguageChange('tl')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img src="http://spar.openg2p.my/spar/img/flag_tl.png" alt="Filipino" />
                  <span>Filipino</span>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
