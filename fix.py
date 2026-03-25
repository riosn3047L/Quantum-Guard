import sys

with open("implementation/frontend/tools.html", "r") as f:
    lines = f.readlines()

# Delete the bad lines 656 to 862 (inclusive).
# In 0-indexed list, 656 is index 655, 862 is index 861.
# So slice is [655:862]
del lines[655:862]

# Now find the place to insert the new UI functions
# We should look for "// ═══ CRYPTODEPS ═══"
insert_idx = -1
for i, line in enumerate(lines):
    if "// ═══ CRYPTODEPS ═══" in line:
        insert_idx = i
        break

if insert_idx != -1:
    ui_funcs = """
    function toggleAccordion(id) {
       const el = document.getElementById(id);
       const icon = document.getElementById(id + '-icon');
       if(el.style.display === 'none') {
           el.style.display = 'block';
           icon.style.transform = 'rotate(180deg)';
       } else {
           el.style.display = 'none';
           icon.style.transform = 'rotate(0deg)';
       }
    }

    function renderUnifiedReport(el, uReport) {
      if(!uReport || !uReport.summary) {
         el.innerHTML = '<div class="p-4 text-error bg-error/10 rounded">Reporting failed.</div>';
         return;
      }
      const sum = uReport.summary;
      const qColor = sum.average_quantum_score >= 80 ? '#10B981' : sum.average_quantum_score >= 50 ? '#F59E0B' : '#F43F5E';
      const mainResult = uReport.main_domain;
      let subArr = uReport.subdomains || [];
      // filter out subdomains that are exactly main domain
      subArr = subArr.filter(s => s.hostname !== uReport.domain);

      // We render a top dashboard, then a main domain card, then accordion for subdomains.
      
      let html = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
         <div class="glass-card rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="material-symbols-outlined text-secondary text-3xl mb-1">dns</span>
            <div class="font-headline font-black text-2xl">${sum.total_hosts_scanned}</div>
            <div class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Hosts Scanned</div>
            <div class="text-xs text-secondary mt-1">${sum.active_hosts} Active / ${sum.unreachable_hosts} Dead</div>
         </div>
         <div class="glass-card rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="material-symbols-outlined text-3xl mb-1" style="color: ${qColor}">speed</span>
            <div class="font-headline font-black text-2xl" style="color: ${qColor}">${sum.average_quantum_score}</div>
            <div class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Avg Q-Score</div>
         </div>
         <div class="glass-card rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="material-symbols-outlined text-3xl mb-1 ${sum.critical_vulnerabilities > 0 ? 'text-error' : 'text-[#10B981]'}">security</span>
            <div class="font-headline font-black text-2xl ${sum.critical_vulnerabilities > 0 ? 'text-error' : 'text-[#10B981]'}">${sum.critical_vulnerabilities}</div>
            <div class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Critical Vulns</div>
         </div>
         <div class="glass-card rounded-xl p-4 flex flex-col justify-center items-center text-center">
            <span class="material-symbols-outlined text-primary text-3xl mb-1">lock_clock</span>
            <div class="font-headline font-black text-2xl text-primary">${sum.hosts_with_tls_1_3}</div>
            <div class="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">TLS 1.3 Active</div>
         </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2 font-black border-b border-outline-variant/20 pb-2">Main Domain</h3>
        <div id="mainDomainReport"></div>
      </div>
      
      <div class="mb-4">
        <h3 class="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-4 font-black border-b border-outline-variant/20 pb-2">Subdomains (${subArr.length})</h3>
        <div class="space-y-4">
      `;
      
      if(subArr.length === 0) {
         html += '<div class="text-sm text-on-surface-variant italic">No additional subdomains found.</div>';
      }

      subArr.forEach((s, idx) => {
         const id = 'subdomain-' + idx;
         let badgeColor = 'bg-surface-container border-outline-variant/20 text-on-surface-variant';
         let innerColor = '#859398';
         if(s.status === 'completed') {
            const sq = s.quantum_score || 0;
            innerColor = sq >= 80 ? '#10B981' : sq >= 50 ? '#F59E0B' : '#F43F5E';
            badgeColor = sq >= 80 ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' : sq >= 50 ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30' : 'bg-error/10 text-error border-error/30';
         } else if(s.status === 'error' || s.status === 'timeout') {
            badgeColor = 'bg-error/10 text-error border-error/30';
            innerColor = '#F43F5E';
         }
         
         html += `
         <div class="glass-card rounded-xl border border-outline-variant/20 overflow-hidden">
            <div class="p-4 cursor-pointer hover:bg-surface-container-high/50 flex justify-between items-center select-none" onclick="toggleAccordion('${id}')">
               <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-sm" style="color:${innerColor}">dns</span>
                  <span class="font-mono text-sm font-bold">${s.hostname}</span>
                  <span class="border rounded px-2 py-0.5 text-[10px] font-bold uppercase ${badgeColor} shadow-sm">${s.status}</span>
               </div>
               <div class="flex items-center gap-4 text-xs text-on-surface-variant">
                  ${s.status === 'completed' ? `<span class="font-mono bg-surface-container px-2 py-1 rounded">Score: <strong style="color:${innerColor}">${s.quantum_score || 0}</strong></span>` : ''}
                  <span class="material-symbols-outlined transition-transform duration-300" id="${id}-icon">expand_more</span>
               </div>
            </div>
            <div id="${id}" style="display:none;" class="p-4 border-t border-outline-variant/10 bg-surface-container-lowest/50">
               <div id="${id}-content">Loading...</div>
            </div>
         </div>
         `;
      });
      
      html += '</div></div>';
      el.innerHTML = html;
      
      // Render main domain
      if(mainResult.status === 'completed') {
         renderSSLyzeResults(document.getElementById('mainDomainReport'), Scanner.parseSSLyzeResults(mainResult), mainResult);
      } else {
         document.getElementById('mainDomainReport').innerHTML = `<div class="p-4 glass-card rounded border border-error/20 text-error/80 text-sm">Failed to scan: ${mainResult.status} ${mainResult.errors ? mainResult.errors.join(', ') : ''}</div>`;
      }
      
      // Render subdomains
      subArr.forEach((s, idx) => {
         const sid = 'subdomain-' + idx + '-content';
         const sel = document.getElementById(sid);
         if(sel) {
            if(s.status === 'completed') {
               renderSSLyzeResults(sel, Scanner.parseSSLyzeResults(s), s);
            } else {
               sel.innerHTML = `<div class="text-sm font-mono text-error/70">${s.status}: ${s.errors ? s.errors.join(', ') : 'Host unreachable or scan failed'}</div>`;
            }
         }
      });
    }
"""
    lines.insert(insert_idx, ui_funcs + "\n")

with open("implementation/frontend/tools.html", "w") as f:
    f.writelines(lines)
