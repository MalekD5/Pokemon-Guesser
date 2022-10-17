import logo from '../assets/logo.svg';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4 drop-shadow-lg">
        <div className='flex items-center flex-shrink-0 text-white ml-6'>
            <img className='fill-current w-8 h-8 mr-2' src={logo} alt="logo" />
            <span className='font-semibold text-xl tracking-tight'>Pokemon Guesser</span>
        </div>
        <div>
      <a href="https://github.com/MalekD5/Pokemon-Guesser" className="inline-block text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 xs:mb-3">Github &#10084;</a>
    </div>
    </nav>
  )
}
