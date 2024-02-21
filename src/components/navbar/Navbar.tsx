export default function Navbar() {
  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <a href='/' className='text-white font-bold text-lg'>
            My Logo
          </a>
        </div>
        <div className='hidden md:block'>
          <a href='/' className='text-gray-300 hover:text-white px-4'>
            Home
          </a>
          <a href='/' className='text-gray-300 hover:text-white px-4'>
            About
          </a>
          <a href='/' className='text-gray-300 hover:text-white px-4'>
            Services
          </a>
          <a href='/' className='text-gray-300 hover:text-white px-4'>
            Contact
          </a>
        </div>
        <div className='md:hidden'>
          <button className='text-white focus:outline-none'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}