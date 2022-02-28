const $ = {
  record: document.querySelector('.ext--record'),
  manifest: document.querySelector('#ext--manifest'),
  vacancy: document.querySelector('#ext--vacancy'),
  campaign: document.querySelector('#ext--campaign'),
};

const makeFileRecordInExtension = (file) => {
  const rec = $.record.cloneNode(true);
  rec.classList.remove('hidden');
  rec.querySelector('span').innerHTML = file.name;
  rec.querySelector('button').addEventListener('click', () => {
    location.href = file.direct_url;
  });
  $.manifest.appendChild(rec);
};

const readThingFilesInDocument = () => {
  let files;
  try {
    const { currentThing } = JSON.parse(localStorage.getItem('persist:root'));
    files = JSON.parse(currentThing).thing.files.filter(
      (file) => file.name.split('.').slice(-1)[0].toLowerCase() === 'stl',
    );
  } catch (ex) {
    files = [];
  }
  chrome.runtime.sendMessage({ files });
};

const listenForThingFilesInExtension = () =>
  chrome.runtime.onMessage.addListener((request) => {
    if (!('files' in request)) return;
    if (!request.files.length) return $.vacancy.classList.remove('hidden');
    request.files.forEach(makeFileRecordInExtension);
  });

const runExtensionContentInDocument = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: readThingFilesInDocument,
  });
};

const setupCampaignInExtension = () => {
  chrome.storage.sync.get(['campaign'], (campaign) => {
    if (!campaign.campaign) {
      $.campaign.classList.add('hidden');
      return;
    }

    $.campaign.querySelector('a').addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://www.buymeacoffee.com/stephancasas' });
    });

    $.campaign.querySelector('button').addEventListener('click', () => {
      $.campaign.classList.add('hidden');
      chrome.storage.sync.set({ campaign: false });
    });
  });
};

listenForThingFilesInExtension();
runExtensionContentInDocument();
setupCampaignInExtension();
