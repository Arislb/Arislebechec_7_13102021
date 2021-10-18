<template>
    <div class="contenergeneral">
        <div class="contener-log"></div>
        <div class="contener">
            
            <div class="barre"></div>
            <div class="space-log"></div>
        </div>
        <div class="contener-signup"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

.contenergeneral{
    background-color: yellowgreen;
    width: 100vw;
    height: 100vh;
    display: flex;
}
.contener-log{
    background-color:red;
    width: 35%;
    height:100%;
}
.contener{
    background-color: blue;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.space-log{
    background-color: yellow;
    width: 30%;
    height: 10%;
}
.barre{
    background-color:black;
    width: 5%;
    height: 50%;
}

.contener-signup{
    background-color: white;
    width: 35%;
    height: 100%;
}
</style>