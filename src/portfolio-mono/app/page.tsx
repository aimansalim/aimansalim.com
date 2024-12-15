import Image from 'next/image'
import { MatrixText } from '../components/matrix-text'

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl">
          <MatrixText text="Aiman Salim" />
        </h1>
        <p className="text-[#A9A9A9]">aiman@boold.it</p>
        <p className="text-[#A9A9A9]">Italy</p>
      </div>

      <Image
        src="https://cdn-s2.toolzu.com/media/466076190_482245634830712_6435738882569699834_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F466076190_482245634830712_6435738882569699834_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_tt6%26_nc_ht%3Dinstagram.fsrg10-1.fna.fbcdn.net%26_nc_cat%3D108%26_nc_ohc%3Dy1lyyZY4LpgQ7kNvgEe09YW%26_nc_gid%3Ddd393af63e94450bb7211e8b73462957%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AYA5I6UJzORf5NGhZQTm_3qfiEpgYWd-YpNjZuFdEUA81g%26oe%3D675CA601%26_nc_sid%3Dd885a2&time=1733745600&key=8f058823c87078cbbf264974b8fedd12"
        alt="Profile"
        width={240}
        height={240}
        className="pixel-corners"
      />

      <div className="space-y-4 text-sm leading-relaxed">
        <p>Hi, I'm Aiman.</p>
        <p>I'm a software engineer and designer.</p>
        <p>
          I think a lot about information architecture, human-computer
          interfaces, and the intersection of design and technology.
        </p>
        <p>
          I currently study Software Engineering at UniMoRe, where I'm working
          on supply chain automation and process optimization.
        </p>
        <p>
          Feel free to explore this website, which serves as a collection
          of my work, thoughts, and ongoing projects.
        </p>
      </div>

      <div className="flex gap-4 text-sm pt-8">
        <a href="#" className="hover-glitch">[x]</a>
        <a href="#" className="hover-glitch">[linkedin]</a>
        <a href="#" className="hover-glitch">[github]</a>
        <a href="#" className="hover-glitch">[instagram]</a>
      </div>
    </div>
  )
}

