function interviewQuestion(job){
    return function (name) {
        if (job==='designer'){
            console.log('Lorem ipsum designer ' + name);
        }
        else if (job==='teacher'){
            console.log('Teacher lorem ipsum ' + name);
        }
        else{
            console.log('Blank '+name+' lorem ipsum');
        }
    }
}

interviewQuestion('designer')('kuba');
interviewQuestion('driver')('darek');