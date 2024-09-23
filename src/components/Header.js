import Image from 'next/image';
import logo from '../assets/img/logo.png';

export default function Header(){
    return (
        <header className="containerHeader">
            <Image 
                src={logo}
                alt='Logo'
            />
            <h2>Bem-vindo de volta, Marcus</h2>
            <p>Segunda, 01 de dezembro de 2025</p>
        </header>
    );
}