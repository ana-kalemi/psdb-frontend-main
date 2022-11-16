import Link from 'next/link';

const path = [
  { name: 'HOME', path: '/' },
  { name: 'EXPLORE', path: '/explore' },
  { name: 'ENCOUNTER', path: '/encounter' },
  { name: 'LOGIN', path: '/user/login' },
  { name: 'SIGNUP', path: '/user/signup' }
];

export default function Header() {
  return (
    <header className="header-background">
      <nav>
        <ul >
          {path.map((value, index) => {
            if(value.name === 'LOGIN' || value.name === 'SIGNUP'){
              return (
                <li key={index} className="header-style">
                  <Link href={value.path}><a> {value.name} </a></Link>
                </li>
              );  
            }else{
              return (
                <li key={index} className="login-style">
                  <Link href={value.path}><a> {value.name} </a></Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </header>
  );
}
