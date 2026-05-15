import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const favoriteColors = [
    '#f08907', '#f9e8e1', '#1d0e0c', '#a31911', '#cfb53b', '#839798', '#5a6871',
    '#6a6766', '#9e1b32', '#310650', '#000250', '#cacaca', '#ccac00', '#000000',
    '#ffffff', '#c9d3c5', '#8d9197', '#484f59', '#204e4b', '#22368b', '#168493',
    '#a54c2b', '#bbd8ea', '#070135', '#3768a4', '#fec56c', '#5287c5', '#85b3a4',
    '#cad338', '#fff4f3', '#353f4c', '#3d4d71', '#261f38', '#bc5727', '#8aae88',
    '#97643a', '#fffbde', '#999ea1', '#efefef', '#285ffb', '#17c6e5', '#2472c6',
  ]

  return (
    <div className="min-h-screen bg-[#efefef] text-[#1f2630]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-[#dddddd] bg-[#f7f7f7] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f6773]">Palette Guide</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#222a33]">Color Hub</h3>
              <p className="mt-3 text-sm leading-7 text-[#5c6674]">
                Explore top-used hex tones and visual combinations for profile pages and brand surfaces.
              </p>
              <div className="mt-5 rounded-xl border border-[#e0e0e0] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e7681]">Quick Tip</p>
                <p className="mt-2 text-sm leading-6 text-[#4d5868]">
                  Keep contrast strong and use neutral backgrounds for long reading blocks.
                </p>
              </div>
            </div>
          </aside>

          <div>
            <section className="rounded-2xl border border-[#dddddd] bg-[#efefef] p-6 sm:p-8">
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#222a33] sm:text-5xl">
                Color Hex Color Codes
              </h1>
              <p className="mt-4 max-w-4xl text-lg leading-9 text-[#2f3a46]">
                Color-hex gives information about colors including color models (RGB, HSL, HSV and CMYK), triadic
                colors, monochromatic colors and analogous colors calculated in color page.
              </p>
              <p className="mt-4 max-w-4xl text-lg leading-9 text-[#2f3a46]">
                Simply type the 6 digit color code in the box above and hit enter to generate readable CSS values and
                matching color sets.
              </p>
            </section>

            <section className="mt-8 rounded-2xl border border-[#dddddd] bg-[#efefef] p-6 sm:p-8">
              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#222a33]">Understanding Hex Color Codes</h2>
              <p className="mt-5 text-lg leading-9 text-[#2f3a46]">
                <strong>Hex color codes</strong> are a fundamental part of digital design, web development, and graphic
                creation. They provide a standardized way to represent colors using a six-character code.
              </p>
              <h3 className="mt-7 text-3xl font-semibold tracking-[-0.02em] text-[#222a33]">What Are Hex Color Codes?</h3>
              <p className="mt-4 text-lg leading-9 text-[#2f3a46]">
                A <strong>hex color code</strong> is a six-digit combination of numbers and letters, preceded by a #
                symbol. Each pair of characters in the code represents the intensity of red, green, and blue in a
                particular color.
              </p>
              <div className="mt-5 rounded-xl border border-[#cccccc] bg-[#f5f5f5] px-5 py-4 font-mono text-base text-[#1f2630]">
                #RRGGBB
              </div>
              <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-9 text-[#2f3a46]">
                <li>RR represents the red component (00 to FF).</li>
                <li>GG represents the green component (00 to FF).</li>
                <li>BB represents the blue component (00 to FF).</li>
              </ul>
              <h3 className="mt-7 text-3xl font-semibold tracking-[-0.02em] text-[#222a33]">Why Use Hex Codes?</h3>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-9 text-[#2f3a46]">
                <li>Precision: Ensures exact color representation.</li>
                <li>Web Compatibility: Used in HTML and CSS for styling elements.</li>
                <li>Compactness: Short, easy-to-read format for development.</li>
              </ul>
            </section>

            <section className="mt-8 rounded-2xl border border-[#dddddd] bg-[#efefef] p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#222a33]">Users Latest Favorite Colors</h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                {favoriteColors.map((color) => (
                  <div key={color} className="group">
                    <div
                      className="h-28 rounded-md border border-black/10 transition-transform duration-200 group-hover:scale-[1.02]"
                      style={{ backgroundColor: color }}
                    />
                    <p className="mt-2 text-center font-mono text-[28px] leading-none tracking-tight text-[#1f2630] sm:text-sm">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
