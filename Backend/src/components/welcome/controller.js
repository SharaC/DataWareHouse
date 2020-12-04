const apiWelcome = (req, res) => {
    res.status(200).json("Datawarehouse Sharac: it works fine ;)");
    
};

module.exports = {
    apiWelcome
}