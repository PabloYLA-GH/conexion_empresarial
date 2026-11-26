import { Head } from '@inertiajs/react';
import { ConceptSection } from '@/components/home/concept-section';
import { CtaSection } from '@/components/home/cta-section';
import { EcosystemSection } from '@/components/home/ecosystem-section';
import { FeaturedProfilesSection } from '@/components/home/featured-profiles-section';
import { HeroSection } from '@/components/home/hero-section';
import { LinkingSection } from '@/components/home/linking-section';
import { UpcomingSection } from '@/components/home/upcoming-section';

export default function Home() {
    return (
        <>
            <Head title="Inicio" />
            <main>
                <HeroSection />
                <div className="mt-[87px] flex flex-col border-t border-solid border-[#e2e8f0] bg-[#f8fafc] px-4 pt-[64px] pb-[152px]">
                    <ConceptSection />
                    <div className="mt-[147px]">
                        <EcosystemSection />
                    </div>
                    <div className="mt-[77px]">
                        <FeaturedProfilesSection />
                    </div>
                    <div className="mt-[43px]">
                        <LinkingSection />
                    </div>
                    <div className="mt-[113px]">
                        <UpcomingSection />
                    </div>
                    <div className="mt-[66px]">
                        <CtaSection />
                    </div>
                </div>
            </main>
        </>
    );
}
