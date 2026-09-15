const play=document.getElementById('replayIntro'),inspect=document.getElementById('inspectIntro'),sound=document.getElementById('introSound'),pause=document.getElementById('pauseIntro');
function ready(){
  const intro=window.OverseerIntro;
  if(intro?.unavailable){
    play.textContent='3D unavailable';play.disabled=inspect.disabled=sound.disabled=true;
    if(pause)pause.hidden=true;document.body.classList.remove('intro-playing');return;
  }
  if(!intro?.setMuted)return;
  play.disabled=inspect.disabled=sound.disabled=false;
  play.textContent=intro.muted?'Play intro':'Play with sound';sound.textContent=intro.muted?'Sound off':'Sound on';sound.setAttribute('aria-pressed',String(!intro.muted));
  if(pause){pause.disabled=false;pause.textContent=intro.state==='playing'?'Pause':'Resume';pause.hidden=!['playing','paused','loading'].includes(intro.state);}
  document.body.classList.toggle('intro-playing',intro.state==='playing');
}
play.addEventListener('click',()=>window.OverseerIntro?.replay({sound:true}));
inspect.addEventListener('click',()=>window.OverseerIntro?.inspect());
sound.addEventListener('click',async()=>{const intro=window.OverseerIntro;if(!intro?.setMuted)return;await intro.setMuted(!intro.muted);ready();});
pause?.addEventListener('click',()=>window.OverseerIntro?.togglePause());
// Keyboard shortcuts belong to this preview only, never the coaching workspace.
document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||event.repeat||event.target.closest?.('input,textarea,select,[contenteditable],button,a'))return;
  if(event.code==='Space'){event.preventDefault();window.OverseerIntro?.togglePause();}
  if(event.key.toLowerCase()==='r')window.OverseerIntro?.replay({sound:true});
  if(event.key.toLowerCase()==='m')sound.click();
});
window.addEventListener('overseer-intro-state',ready);
window.addEventListener('overseer-intro-unavailable',ready);
window.addEventListener('overseer-intro-ready',ready);ready();
window.addEventListener('overseer-intro-audio-error',()=>{sound.textContent='Sound unavailable';sound.title='This browser could not start audio. The animation still works.';});
