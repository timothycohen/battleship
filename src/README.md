### features:
- [x] players can place their ships manually
- [x] players can place their ships at random
- [ ] allow second player as computer
- [x] show/hide toggle for own ships
- [ ] implement drag/drop instead of click for ship setup

### styling:
- [x] new game form
- [x] icons (ship, hit, miss, sunk) on gameboard
- [x] attack animation on gameboard
- [x] miss animation
- [ ] represent ships across multiple squares instead of individual spaces
- [ ] scoreboard
- [ ] hit animation
- [ ] sink animation
- [ ] gameover animation
- [ ] check on multiple screen sizes

### testing:
- [ ] placeShipsRandomly is not a pure function. need to mock for timeout/thrown error

### bugs:
- [ ] gameboard overflows on very small screens (385px)
- [ ] if the attacker clicks quickly, they can send multiple attacks on one round. need a flag or debounce function

### Keywords used in code:
- DEVTOOL
- NOTIMPLEMENTED
- BUG