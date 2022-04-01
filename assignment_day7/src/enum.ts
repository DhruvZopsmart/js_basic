enum bol {
    true,
    false,
    wow
}




function shop(shopopen: bol): void {
    if (shopopen == bol.true)
        console.log('come inside');
    else if (shopopen == bol.false)
        console.log('shop closed');
    else { console.log('shop is not at that location'); }
}

shop(bol.wow);