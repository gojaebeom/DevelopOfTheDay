import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class DisqusService {

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

    init(identifier: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        
        // 브라우저에서만 Disqus 스크립트 로드
        const disqus_config = {
            page: {
                //   url: 'localhost:4200/posts',
              url: 'https://dotday.xyz/posts',
              identifier: identifier
            }
        };
        const disqus_shortname = 'jaebeomsblog';
        const existingScript = document.querySelector(`script[src^="https://${disqus_shortname}.disqus.com/embed.js"], script[src^="https://launchpad.privacymanager.io"]`);
        
        if (existingScript) {
          // 스크립트 삭제
          existingScript.parentNode?.removeChild(existingScript);
        }
        
        // Disqus 초기화
        const dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = `https://${disqus_shortname}.disqus.com/embed.js`;
        dsq.setAttribute('data-timestamp', new Date().getTime().toString());
        document.getElementsByTagName('head')[0].appendChild(dsq);
        (window as any).disqus_config = disqus_config;
    }
}