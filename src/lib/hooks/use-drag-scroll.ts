import { useEffect, useCallback, useRef } from 'react';

interface DragScrollOptions {
    speed?: number;
    threshold?: number;
    disabled?: boolean;
}

export const useDragScroll = (options: DragScrollOptions = {}) => {
    const { speed = 2, threshold = 0, disabled = false } = options;

    // Store state in refs to access in callbacks
    const stateRef = useRef({
        isDragging: false,
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
        element: null as HTMLElement | null,
    });

    const cleanup = useCallback((element: HTMLElement) => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseUp);
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
    }, []);

    const handleMouseDown = useCallback(
        (e: MouseEvent) => {
            const { element } = stateRef.current;
            if (!element || disabled) return;

            stateRef.current.isDragging = true;
            element.style.cursor = 'grabbing';
            element.style.userSelect = 'none';

            stateRef.current.startX = e.pageX - element.offsetLeft;
            stateRef.current.startY = e.pageY - element.offsetTop;
            stateRef.current.scrollLeft = element.scrollLeft;
            stateRef.current.scrollTop = element.scrollTop;
        },
        [disabled],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const {
                isDragging,
                startX,
                startY,
                scrollLeft,
                scrollTop,
                element,
            } = stateRef.current;
            if (!isDragging || !element || disabled) return;

            e.preventDefault();

            const x = e.pageX - element.offsetLeft;
            const y = e.pageY - element.offsetTop;
            const walkX = (x - startX) * speed;
            const walkY = (y - startY) * speed;

            if (Math.abs(walkX) > threshold) {
                element.scrollLeft = scrollLeft - walkX;
            }

            if (Math.abs(walkY) > threshold) {
                element.scrollTop = scrollTop - walkY;
            }
        },
        [disabled, speed, threshold],
    );

    const handleMouseUp = useCallback(() => {
        const { element } = stateRef.current;
        if (!element) return;

        stateRef.current.isDragging = false;
        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');
    }, []);

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            const { element } = stateRef.current;
            if (!element || disabled) return;

            stateRef.current.isDragging = true;
            element.style.userSelect = 'none';

            const touch = e.touches[0];
            stateRef.current.startX = touch.pageX - element.offsetLeft;
            stateRef.current.startY = touch.pageY - element.offsetTop;
            stateRef.current.scrollLeft = element.scrollLeft;
            stateRef.current.scrollTop = element.scrollTop;
        },
        [disabled],
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            const {
                isDragging,
                startX,
                startY,
                scrollLeft,
                scrollTop,
                element,
            } = stateRef.current;
            if (!isDragging || !element || disabled) return;

            e.preventDefault();

            const touch = e.touches[0];
            const x = touch.pageX - element.offsetLeft;
            const y = touch.pageY - element.offsetTop;
            const walkX = (x - startX) * speed;
            const walkY = (y - startY) * speed;

            if (Math.abs(walkX) > threshold) {
                element.scrollLeft = scrollLeft - walkX;
            }

            if (Math.abs(walkY) > threshold) {
                element.scrollTop = scrollTop - walkY;
            }
        },
        [disabled, speed, threshold],
    );

    const handleTouchEnd = useCallback(() => {
        const { element } = stateRef.current;
        if (!element) return;

        stateRef.current.isDragging = false;
        element.style.removeProperty('user-select');
    }, []);

    const setup = useCallback(
        (element: HTMLElement) => {
            element.style.cursor = 'grab';
            element.addEventListener('mousedown', handleMouseDown);
            element.addEventListener('mousemove', handleMouseMove, {
                passive: false,
            });
            element.addEventListener('mouseup', handleMouseUp);
            element.addEventListener('mouseleave', handleMouseUp);
            element.addEventListener('touchstart', handleTouchStart, {
                passive: false,
            });
            element.addEventListener('touchmove', handleTouchMove, {
                passive: false,
            });
            element.addEventListener('touchend', handleTouchEnd);
        },
        [
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
            handleTouchStart,
            handleTouchMove,
            handleTouchEnd,
        ],
    );

    const setRef = useCallback(
        (element: HTMLElement | null) => {
            const currentElement = stateRef.current.element;
            if (element === currentElement) return;

            // Clean up old element
            if (currentElement) {
                cleanup(currentElement);
            }

            // Set up new element
            stateRef.current.element = element;

            if (element && !disabled) {
                setup(element);
            }
        },
        [disabled, setup, cleanup],
    );

    useEffect(() => {
        return () => {
            const { element } = stateRef.current;
            if (element) {
                cleanup(element);
            }
        };
    }, [cleanup]);

    return setRef;
};
