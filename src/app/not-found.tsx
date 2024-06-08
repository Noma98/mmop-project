export default function NotFound() {
  return (
    <section className='py-[70px] flex flex-col justify-center items-center bg-base h-full'>
      <div className='font-extrabold text-6xl'>Oops!</div>
      <h2 className='font-extrabold text-3xl bg-point3 mt-2 px-2'>
        404-PAGE NOT FOUND
      </h2>
      <p className='text-center mt-8'>
        The page you are looking for might have been removed
        <br />
        had it&apos;s name changed or is temporarily unavailable.
      </p>
    </section>
  );
}
