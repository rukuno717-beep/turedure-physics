import Link from 'next/link';
import { PhysicsIcon, NoteIcon, BookIcon, CoffeeIcon } from '@/components/Header';

export default function Home() {
  return (
    <div className="space-y-12 max-w-3xl">
      {/* 日々の備忘録 セクション */}
      <section>
        <h2 className="text-3xl font-bold text-black border-b-2 border-neutral-300 pb-3 mb-6 tracking-wide">
          日々の備忘録に
        </h2>

        {/* 本文（スマホは text-sm、PCは text-base） */}
        <p className="text-black text-sm md:text-base font-medium leading-relaxed md:leading-loose mb-8">
          日常で学んだことや思ったことを備忘録的にまとめているサイトです。<br />
          物理学とことこでは場の量子論に至る過程を分かりやすく説明する予定です。<br />
          物理備忘録では物理学とことこの草案や日々の考察や学んだことを書いていきます。<br />
          読書とことこでは、読んで面白い本があったら感想を書いていきます。<br />
          日常備忘録は日常の備忘録です。<br />
          Yの日常備忘録はYによる日常の備忘録です。
        </p>

        {/* 5つのカテゴリーボタン */}
        <div className="space-y-3">
          <Link
            href="/categories/o3fze0op6w"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm md:text-base group shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <PhysicsIcon /> 物理学とことこ
            </span>
          </Link>

          <Link
            href="/categories/5fhila85r2-1"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm md:text-base group shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <NoteIcon /> 物理備忘録
            </span>
          </Link>

          <Link
            href="/categories/a0p7s73val7"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm md:text-base group shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <BookIcon /> 読書とことこ
            </span>
          </Link>

          <Link
            href="/categories/nya1qqbmm"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm md:text-base group shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <CoffeeIcon /> 日常備忘録
            </span>
          </Link>

          <Link
            href="/categories/q2s5e38re6"
            className="flex items-center gap-3 bg-[#bae6fd] hover:bg-[#7dd3fc] transition-all px-4 py-3.5 rounded-lg text-black text-sm md:text-base group shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-white flex-shrink-0 shadow-sm"></span>
            <span className="flex items-center gap-2 underline underline-offset-4 decoration-2 font-semibold">
              <CoffeeIcon /> Yの日常備忘録
            </span>
          </Link>
        </div>
      </section>

      {/* 管理人の自己紹介 セクション */}
      <section className="pt-6">
        <h2 className="text-xl md:text-2xl font-bold text-black border-l-4 border-[#0284c7] pl-3 mb-6 tracking-wide">
          管理人の自己紹介
        </h2>

        {/* 本文（スマホは text-[14.5px]、PCは text-[18.5px]） */}
        <div className="space-y-6 text-neutral-900 text-[14.5px] md:text-[18.5px] leading-relaxed md:leading-[2.15] tracking-wide font-medium">
          <p className="font-bold text-xl md:text-2xl text-black pb-1 border-b border-neutral-300">
            管理人 (B2-427A)
          </p>

          <p>
            大学院で物理学を専攻している者です。
          </p>

          <p>
            主に量子熱力学や非平衡系の物理学に興味があります。現時点(2026年)では、熱場の量子論に興味があり場の量子論の一般論の勉強を進めています。
          </p>

          <p>
            多くの物理好きにある子供のころから宇宙が好きだった、とか高校生以前のときに物理や数学が好きだったとかではなく、大学の物理学という学問に触れて物理が好きになりました。(というか高校の物理学は、何故あんなにつまらなかったのか不思議とさえ思う。)
          </p>

          <p>
            はまってしまった要因として、学部のときに統計力学という授業があり、その授業で習った統計力学が多少なりとも、自分に刺さったらしく(これは何故かわからない。)勉強を進めていくうちに、この世界に対して統計力学が提供する世界観(物理学最大の売りは世界観だと思う。コペルニクス的転回しかり、、)と、自分が持っているこの世界への理解が噛み合い、ある種の「腑に落ちる」という現象を知ってしまい、その気持ちよさというか、心地よさを知ってしまったのが原因だと思われる。
          </p>

          <p>
            小さなころから自然(大雑把に自然と言っていいのかわからない。虫はとても苦手なので)が好きで、よく近くの木に囲まれた場所でお昼寝をしていた。また山登りも好きでよく山や森に足を運んでいた。そういった身近な身の回りのすべての物体や私たち自身の肉体までもが、100種類ほどの原子だけが集まってできている。このことは小学生のときに習うことであり、別に驚くことではないと言う方もいると思うが(実際、自分も知識としてだけは知っていた。)、よくよく考えてみれば、これはすごいことで(小学生の時の先生はもっと大げさに言っていいと思う。)日常生活での体験のほとんどすべてが深遠で当たり前ではない謎になってしまうのである。
          </p>

          <p>
            つまり、なぜ木々は緑で空は青く、雲は白いのか、なぜ岩は硬いのか、なぜ水は冷たくさらさら流れているのか、なぜ我々は意識があり、机には意識がないのか、などすべての「当たり前」だった経験事実が、おそろしく込み入った説明を要する非自明な事実へと成り果ててしまう。こういった小さいころからの当たり前だった事実に、当たり前ではない(そして非自明な)答えを提供してくれるのが物理学であり、これはいわば日常の伏線回収を与えてくれるわけである‼。この伏線回収に感動してしまって、物理学を勉強している者となります。
          </p>

          <p>
            題名の徒然物理学は、「徒然草」の有名な冒頭の言葉である「つれづれなるままに、日くらし、硯にむかひて、、、」「することもなく退屈なままに、一日中硯に向かい、、、」からとっています。最近は物理のせいですることが多く、退屈ではないまま、一日中物理に向かっているので、徒然でないままに物理学なのですが、語呂がいいのでこのような題名にしています。
          </p>

          <p>
            まだ分からないのですが、就職の道を選んだとしても、趣味として物理学の勉強は続けたいと思っているので、勉強したことをまとめる場所を作ろう(昔はノート派だったのですが、見返しづらいし、かさばってしまう。)と思い、本サイトを作りました。第三者がみる可能性がある以上、分かりやすく、読みやすいものを作るよう心がけるつもりですが、まだ若輩者であり、間違っている点、おかしな日本語があると思うので、ご覧になる場合はご注意をお願いします。また質問点や指摘点がございましたら下記にメールアドレスを載せますので、ご連絡下さい。
          </p>

          <p>
            自分なりにぶつぶつ考えたことを主にブログみたいな感じで気ままに更新していく予定です。1週間に１回は何かを更新する予定です。
          </p>

          {/* お問い合わせ・連絡先 */}
          <div className="mt-8 pt-6 border-t border-neutral-300 text-black font-semibold">
            <p>
              ご質問やご指摘がございましたら<br />
              <a
                href="mailto:rukuno717@gmail.com"
                className="text-[#0284c7] hover:underline font-bold underline-offset-4"
              >
                rukuno717@gmail.com
              </a>
              まで
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}