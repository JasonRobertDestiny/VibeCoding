async function loadEpisodes() {
  const $list = document.getElementById('list');
  try {
    const res = await fetch('./data/episodes.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const episodes = await res.json();
    for (const ep of episodes) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${ep.title}</h3>
        <p class="muted">${ep.date} · ${ep.duration}</p>
        <button data-id="${ep.id}">查看摘要</button>
        <pre id="sum-${ep.id}" class="muted"></pre>
      `;
      card.querySelector('button').addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const pre = document.getElementById('sum-' + id);
        pre.textContent = '加载中...';
        try {
          const ctl = new AbortController();
          const timer = setTimeout(() => ctl.abort(), 8000);
          const r = await fetch('./data/summaries/' + id + '.json', { signal: ctl.signal });
          clearTimeout(timer);
          if (!r.ok) throw new Error('HTTP ' + r.status);
          const s = await r.json();
          pre.textContent = s.summary;
        } catch (err) {
          pre.textContent = '获取摘要失败：' + err.message;
        }
      });
      $list.appendChild(card);
    }
  } catch (err) {
    $list.textContent = '加载列表失败：' + err.message;
  }
}
loadEpisodes();

