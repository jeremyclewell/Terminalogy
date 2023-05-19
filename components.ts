import * as blessed from 'blessed';

export const box = (content: string) => {
  return blessed.box({
    top: 'center',
    left: 'center',
    width: 'shrink',
    height: 'shrink',
    padding: 3,
    tags: true,
    content,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  })
  }

export const heading = (content: string, parent: any) => {
  return blessed.text({
    parent,
    top: -3,
    left: -3,
    width:'shrink',
    content
      })
  };

export const button = (content: string, parent: any) => {
  return blessed.button({
    parent,
    bottom: -3,
    left: 'center',
    width: 'shrink',
    content,
      shadow: true
  });
};


export const screen = blessed.screen({
  smartCSR: true,
  style: {
    bg: 'magenta',
  }
})

export const prompt = blessed.prompt({
  parent: screen,
  left: 'center',
  top: 'center',
  width: '50%',
  height: 'shrink',
  border: {
    type: 'line'
  },
  submitOnEnter: true,
})

export const question = blessed.question({
  parent: screen,
  left: 'center',
  top: 'center',
  width: '50%',
  height: 'shrink',
  border: {
    type: 'line'
  },
  submitOnEnter: true,
})

// Create horizontal bottom menu list
export const menuBar = blessed.listbar({
  bottom: 0,
  height: 'shrink',
  width: "100%",
  border: {
    type: 'line'
  },
  style: {
    selected: {
      bg: "yellow",
      fg: "white"
    },
    item: {
      bg: "grey",
      fg: "yellow"
    },
  },
})