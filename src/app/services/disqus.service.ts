import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class DisqusService {

    constructor() {}

    init(identifier: string) {
        const disqus_config = function (this:any) {
            this.page.identifier = identifier;
            this.page.url = 'https://dotday.xyz/posts';
        }
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