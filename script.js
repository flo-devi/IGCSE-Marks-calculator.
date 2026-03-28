const subjects = {
    math:{code:"0580",papers:["Paper 1","Paper 2"],maxMarks:[100,100],weights:[1,1],total:200, thresholds:{Astar:170,A:146,B:114,C:83,D:65,E:50,F:0}},
    cs:{code:"0478",papers:["Paper 1","Paper 2"],maxMarks:[75,75],weights:[1,1],total:150, thresholds:{Astar:120,A:100,B:75,C:50,D:42,E:35,F:0}},
    bio:{code:"0610",papers:["MCQ","Theory","ATP"],maxMarks:[40,80,40],weights:[1.5,1.25,1],total:200, thresholds:{Astar:163,A:144,B:125,C:105,D:85,E:71,F:50}},
    chem:{code:"0620",papers:["MCQ","Theory","ATP"],maxMarks:[40,80,40],weights:[1.5,1.25,1],total:200, thresholds:{Astar:173,A:146,B:118,C:88,D:77,E:66,F:53}},
    phy:{code:"0625",papers:["MCQ","Theory","ATP"],maxMarks:[40,80,40],weights:[1.5,1.25,1],total:200, thresholds:{Astar:159,A:137,B:115,C:94,D:80,E:67,F:52}}
};

let currentSubject=null;

function renderInputs(){
    const subj=document.getElementById('subject').value;
    const container=document.getElementById('inputs-container');
    container.innerHTML=''; 
    document.getElementById('result').innerHTML=''; 
    document.getElementById('thresholds-box').innerHTML=''; 
    currentSubject=null;
    if(!subj) return;
    currentSubject=subjects[subj];
    currentSubject.papers.forEach((p,i)=>{
        const input=document.createElement('input');
        input.type='number'; 
        input.id=`p${i}`; 
        input.placeholder=`${p} Marks`;
        input.min=0; input.max=currentSubject.maxMarks[i];
        const label=document.createElement('label');
        label.innerHTML=`Weight factor: ${currentSubject.weights[i]}x | Max marks: ${currentSubject.maxMarks[i]}`;
        input.addEventListener('input',()=>{ 
            if(input.value<0) input.value=0; 
            if(input.value>currentSubject.maxMarks[i]) input.value=currentSubject.maxMarks[i];
        });
        container.appendChild(label);
        container.appendChild(input);
    });
}

function calculateGrade(){
    if(!currentSubject) return alert("Select a subject first");
    let total=0,valid=true;
    const container=document.getElementById('result'); container.innerHTML=''; 
    const thresholdsBox=document.getElementById('thresholds-box'); thresholdsBox.innerHTML='';
    currentSubject.papers.forEach((p,i)=>{
        let val=parseFloat(document.getElementById(`p${i}`).value);
        if(isNaN(val)) val=0;
        if(val<0||val>currentSubject.maxMarks[i]){ alert(`Invalid marks for ${p} (0-${currentSubject.maxMarks[i]})`); valid=false; return;}
        total+=val*currentSubject.weights[i];
    });
    if(!valid) return;
    let grade='F';
    for(let g in currentSubject.thresholds){
        if(total>=currentSubject.thresholds[g]){ grade=g; break; }
    }
    const percent=(total/currentSubject.total)*100;
    container.innerHTML=`<strong>Subject: ${document.getElementById('subject').selectedOptions[0].text}</strong><br>
        Total (weighted): ${total.toFixed(2)}/${currentSubject.total}<br>
        Percentage: ${percent.toFixed(2)}%<br>
        Grade: ${grade}<br><br>`;
    
    currentSubject.papers.forEach((p,i)=>{
        const pc=Math.min((parseFloat(document.getElementById(`p${i}`).value||0)*currentSubject.weights[i]/currentSubject.total)*100,100);
        const prog=document.createElement('div'); prog.className='progress-container';
        const bar=document.createElement('div'); bar.className='progress-bar'; prog.appendChild(bar);
        container.appendChild(document.createTextNode(`${p} contribution:`)); container.appendChild(prog);
        setTimeout(()=>{ bar.style.width=pc+'%'; },100);
    });

    let tHTML='<strong>Grade Thresholds:</strong><br><ul>';
    for(let g in currentSubject.thresholds){
        tHTML+=`<li>${g}: ${currentSubject.thresholds[g]} / ${currentSubject.total}</li>`;
    }
    tHTML+='</ul>'; thresholdsBox.innerHTML=tHTML;
}

// Theme button cycles 5 colors
const colors = ["#ff9800","#4caf50","#2196f3","#9c27b0","#e91e63"];
let colorIndex = 0;
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', ()=>{
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.setProperty('--accent-color', colors[colorIndex]);
    themeBtn.style.background = colors[colorIndex]; // button color matches accent
});

// Light/Dark mode toggle
const modeSwitch = document.getElementById('modeSwitch');
const modeLabel = document.querySelector('.mode-label');
modeSwitch.addEventListener('change',()=>{
    if(modeSwitch.checked){ document.body.classList.add('light-mode'); modeLabel.textContent='Dark Mode'; }
    else{ document.body.classList.remove('light-mode'); modeLabel.textContent='Light Mode'; }
});
