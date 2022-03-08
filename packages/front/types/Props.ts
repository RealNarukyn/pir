export interface CarouselItemProps {
    bgImage: string;
    title: string;
    subTitle: string;
    btnTxt: string;
    href: string;
};

export interface CardOpenGameProps {
    _id: string;
    trackID: string;
    userID: string;
    bName: string;
    bEmail: string;
    bDate: string;
    initTime: string;
    endTime: string;
    duration: number;
    openGame: boolean;
    host: string;
    players: string[];
    stillJoinable: boolean;
    minSkill: string;
    maxSkill: string;
}
