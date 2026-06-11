import { Leaf, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import logo from '../../assets/logo.jpeg'

export function SiteFooter () {
  return (
    <footer className='mt-24 border-t border-border bg-background'>
      <div className='mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4'>
        <div>
          <div className='flex items-center gap-2'>
              <img
                src={logo}
                alt='PotnPlant'
                className='h-12 w-12 rounded-full object-cover'
              />
            <span className='font-display text-2xl tracking-[0.32em]'>
              POTNPLANT
            </span>
          </div>
          <p className='mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground'>
            Empowering all people to be plant people — a small studio shipping
            greenery and care notes from our greenhouse to your window.
          </p>
          <p className='mt-6 text-sm'>
            <span className='text-primary'>hotline: </span>
            <span className='font-medium'>(+254) 700 000 000</span>
          </p>
          <div className='mt-6 flex gap-4 text-muted-foreground'>
            <Instagram className='h-4 w-4 hover:text-foreground' />
            <Facebook className='h-4 w-4 hover:text-foreground' />
            <Twitter className='h-4 w-4 hover:text-foreground' />
            <Youtube className='h-4 w-4 hover:text-foreground' />
          </div>
        </div>
        <div>
          <h4 className='text-sm font-semibold'>Information</h4>
          <ul className='mt-5 space-y-3 text-sm text-muted-foreground'>
            {[
              'About Us',
              'Payments & Returns',
              'Product Care',
              'Contact',
              'FAQ'
            ].map(l => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-sm font-semibold'>Quick Links</h4>
          <ul className='mt-5 space-y-3 text-sm text-muted-foreground'>
            {[
              'My orders',
              'Terms & Conditions',
              'Returns & Exchanges',
              'Shipping & Delivery',
              'Privacy Policy'
            ].map(l => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-sm font-semibold'>Shop Instagram</h4>
          <div className='mt-5 grid grid-cols-3 gap-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='aspect-square rounded-sm bg-muted' />
            ))}
          </div>
        </div>
      </div>
      <div className='bg-foreground py-5 text-center text-xs text-background/80'>
        Copyright © 2026 PotnPlant — All Rights Reserved
      </div>
    </footer>
  )
}
